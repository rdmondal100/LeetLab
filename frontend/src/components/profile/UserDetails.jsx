import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSelector, useDispatch } from "react-redux";
import { avaterPlaceholder } from "../../assets";
import { Award, Flame, Goal, Mail, Pencil } from "lucide-react";
import axios from "axios";
import { toast } from "sonner"; // optional if you use toasts
import { BASEURL } from "../../lib/constants";

const UserDetails = ({ stats }) => {
  const authUser = useSelector((state) => state.auth?.authUser);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(authUser?.name || "");
  const [image, setImage] = useState(authUser?.image || "");
  const [loading, setLoading] = useState(false);

  const defaults = {
    solved: 0,
    acceptance: "0%",
    rank: 0,
    streak: 0,
  };

  const s = { ...defaults, ...(stats || {}) };
  // Handle profile update
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BASEURL}/profile`,
        { name, image },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully");
        // optionally dispatch redux update
        // dispatch(updateAuthUser(res.data.data));
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="relative bg-gradient-to-br from-primary/10 to-muted shadow-md hover:shadow-lg transition-all">
        <Badge className="absolute right-3 top-3 bg-primary/20 border border-primary/30 text-primary font-medium">
          {authUser?.role}
        </Badge>

        <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
          {/* Left: Avatar + Edit */}
          <div className="relative group">
            <Avatar className="w-28 h-28 ring-2 ring-primary/30 shadow-sm">
              <AvatarImage src={authUser?.image || avaterPlaceholder} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-1 right-1 bg-white/90 hover:bg-white text-primary border border-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition"
              onClick={() => setOpen(true)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-3 w-full">
            <h2 className="text-2xl font-bold tracking-tight">
              {authUser?.name}
            </h2>

            <div className="flex items-center text-muted-foreground gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <small>{authUser?.email}</small>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <Badge className="bg-primary/20 flex items-center gap-2 text-sm px-3 py-1">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>Rank #{s.rank}</span>
              </Badge>

              <Badge className="bg-primary/20 flex items-center gap-2 text-sm px-3 py-1">
                <Flame className="w-4 h-4 text-red-500" />
                <span>{s.streak}d streak</span>
              </Badge>

              <Badge className="bg-primary/20 flex items-center gap-2 text-sm px-3 py-1">
                <Goal className="w-4 h-4 text-green-500" />
                <span>{s.acceptance} success</span>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Edit Profile Dialog --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Avatar URL</label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste image URL"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserDetails;
