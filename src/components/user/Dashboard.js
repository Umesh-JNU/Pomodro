import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import TimerWrapper from "../timer/TimerWrapper";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, navigate]);

  return (
    <div className="md:h-[100vh] 2xl:container flex flex-col md:flex-row bg-dark p-5 md:p-0">
      <div className="md:basis-1/2 mt-16 md:m-auto">
        <div className="w-full md:w-[70%] m-auto bg-gradient-to-b from-[#1e40af] via-[#1e3a8a] to-[#312e81] p-6 rounded-md">
          <h2>Logged in as</h2>
          <div className="mt-2">{name}</div>
          <div className="mt-2">{user?.email}</div>
          <button
              className="mt-4 py-1 px-4 md:py-2 border rounded-md border-textSecondary text-textSecondary hover:text-hover hover:bg-textSecondary transition-all"
              onClick={logout}
            >
            Logout
          </button>
        </div>{" "}
      </div>
      <div className="sm:basis-1/2 m-auto">
        <TimerWrapper isUser={true}/>
      </div>
    </div>
  );
}
export default Dashboard;
