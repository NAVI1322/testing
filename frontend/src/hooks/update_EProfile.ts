import { Toast } from "@/components/majorComponents/toast";
import axios from "axios";

export async function UpdateEProfile(firstName?: string, lastName?: string,  email?: string ,about?: string) {
    if (!email) {
        Toast("Error", "Email is required", "Try Again");
        return;
    }

    // Create an object to hold the fields to update
    const updateData: any = { email,about};

    // Add fields to the updateData object if they are provided
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    

    try {
        const res = await axios.post("http://localhost:3000/update/Profile", updateData);

        console.log(res);
        Toast("Success", "Profile updated successfully", "Profile has been updated");
    } catch (e) {
        Toast("Error", "Failed to update profile", "Try Again");
        console.error(e);
    }
}