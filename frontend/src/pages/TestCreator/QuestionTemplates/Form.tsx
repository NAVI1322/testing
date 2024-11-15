import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea'; // Adjust import based on your ShadCN setup
import { Button } from '@/components/ui/button'; // Adjust import based on your ShadCN setup
import { Input } from '@/components/ui/input'; // Adjust import based on your ShadCN setup
import { useNavigate } from 'react-router-dom';

const JobForm: React.FC = () => {

    const router = useNavigate();
    const [jobName, setJobName] = useState<string>('');
    const [skills, setSkills] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [benefits, setBenefits] = useState<string>('');
    const [ourValues, setOurValues] = useState<string>('');
    const [whyWorkWithUs, setWhyWorkWithUs] = useState<string>('');
    const [positionSummary, setPositionSummary] = useState<string>('');
    const [positionResponsibilities, setPositionResponsibilities] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formdata = { 
            jobName, 
            skills, 
            description, 
            location, 
            benefits, 
            ourValues, 
            whyWorkWithUs, 
            positionSummary, 
            positionResponsibilities 
        };

        // Navigate to the '/testCreation' route and pass the formdata
        router('/testCreator', { state: { formdata } });

    }
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Job Application Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="jobName" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Name
                    </label>
                    <Input
                        id="jobName"
                        type="text"
                        value={jobName}
                        onChange={(e) => setJobName(e.target.value)}
                        placeholder="Enter job name"
                        required
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                        Skills Required
                    </label>
                    <Input
                        id="skills"
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Enter skills required (comma-separated)"
                        required
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description
                    </label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a detailed job description"
                        required
                        rows={5} // Adjust the number of rows for better visibility
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                    </label>
                    <Input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter job location"
                        required
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-2">
                        Benefits
                    </label>
                    <Textarea
                        id="benefits"
                        value={benefits}
                        onChange={(e) => setBenefits(e.target.value)}
                        placeholder="List benefits offered for the job (e.g., health insurance, retirement plans)"
                        required
                        rows={4} // More space for users to describe benefits
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="ourValues" className="block text-sm font-medium text-gray-700 mb-2">
                        Our Values
                    </label>
                    <Textarea
                        id="ourValues"
                        value={ourValues}
                        onChange={(e) => setOurValues(e.target.value)}
                        placeholder="Describe your company's values and culture"
                        required
                        rows={3} // Moderate space for values
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="whyWorkWithUs" className="block text-sm font-medium text-gray-700 mb-2">
                        Why Work With Us
                    </label>
                    <Textarea
                        id="whyWorkWithUs"
                        value={whyWorkWithUs}
                        onChange={(e) => setWhyWorkWithUs(e.target.value)}
                        placeholder="Provide reasons to work with your company"
                        required
                        rows={3} // Space for reasons to work
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="positionSummary" className="block text-sm font-medium text-gray-700 mb-2">
                        Position Summary
                    </label>
                    <Textarea
                        id="positionSummary"
                        value={positionSummary}
                        onChange={(e) => setPositionSummary(e.target.value)}
                        placeholder="Summarize the position in a few sentences"
                        required
                        rows={3} // Space for a brief summary
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="positionResponsibilities" className="block text-sm font-medium text-gray-700 mb-2">
                        Position Responsibilities
                    </label>
                    <Textarea
                        id="positionResponsibilities"
                        value={positionResponsibilities}
                        onChange={(e) => setPositionResponsibilities(e.target.value)}
                        placeholder="List key responsibilities for this position (each on a new line)"
                        required
                        rows={6} // More space for detailed responsibilities
                        className="mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    />
                </div>

                <Button 
                    type="submit" 
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
                    Create Game
                </Button>
            </form>
        </div>
    );
};

export default JobForm;