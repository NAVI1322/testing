import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateEProfile } from "@/hooks/update_EProfile";
import { useState, useEffect } from "react";
import { Toast } from "@/components/majorComponents/toast"; // Assuming you have a Toast component

export function AboutModal({ email, firstName, lastName }: { email: string; firstName: string; lastName: string; }) {
  const [fName, setFirstName] = useState(firstName);
  const [lName, setLastName] = useState(lastName);

  // Effect to update state when props change
  useEffect(() => {
    setFirstName(firstName);
    setLastName(lastName);
  }, [firstName, lastName]); 

  const handleSave = async () => {
    try {
      await UpdateEProfile(fName, lName, email); // Use updated values
      Toast("Success", "Profile updated successfully."); // Show success message
      window.location.reload()
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast("Error", "Failed to update profile."); // Show error message
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">
            First Name
          </Label>
          <Input
            id="firstName"
            className="col-span-3"
            value={fName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="lastName" className="text-right">
            Last Name
          </Label>
          <Input
            id="lastName"
            className="col-span-3"
            value={lName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" value={email} className="col-span-3" readOnly />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}