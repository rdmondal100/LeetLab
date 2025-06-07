import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetSubmissionQuery } from "../redux-toolkit/services/submissionService";
import SubmissionList from "./SubmissionsList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Submissions = () => {
  const { id } = useParams();
  const authUser = useSelector((state) => state.auth.authUser);

  const { data, isLoading, isError } = useGetSubmissionQuery(id);

  // Extract submissions safely
  const allSubmissions = data?.data || [];

  // Filter by user ID
  const userSubmissions = allSubmissions.filter(
    (submission) => submission?.userId === authUser?.id
  );
  console.log(data)
  console.log(authUser)

    console.log(userSubmissions)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading submissions...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-4">
        <p className="text-red-500">Failed to load submissions. Please try again.</p>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <SubmissionList submissions={userSubmissions} />
    </div>
  );
};

export default Submissions;
