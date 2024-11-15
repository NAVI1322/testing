import React from 'react';
import JobForm from './QuestionTemplates/Form';
import Navbar from './QuestionTemplates/Navbar';

const JobDes: React.FC = () => {
    return (
        <div>
             <div className="p-2">
             <Navbar />
            </div>  
            <div className="p-4">
             <JobForm />
            </div>
            
        </div>
    );
};

export default JobDes;