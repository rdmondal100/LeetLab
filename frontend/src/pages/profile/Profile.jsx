import React, { useEffect, useState } from "react";
import UserDetails from "../../components/profile/UserDetails";
import UserStatCards from "../../components/profile/UserStatCards";
import axios from "axios";
import { BASEURL } from "../../lib/constants";
  
const Profile = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BASEURL}/profile/stats`, { withCredentials: true });
 
        setStats(res.data.stats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  console.log("stats")
  
  console.log(stats)
  return (
    <div className="container px-2 mt-5">
      <UserDetails  stats={stats} />
      <UserStatCards stats={stats} />
    </div>
  );
};

export default Profile;
