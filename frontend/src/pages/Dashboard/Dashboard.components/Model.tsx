import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sanitize } from 'dompurify';
import React, { useState } from 'react'

const Model = () => {
  return (
    const [isModalOpen, setIsModalOpen] = useState(false);

    <div>
        {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative dark:bg-gray-700">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl font-bold"
            >
              &times;
            </button>
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Apply for {sanitize(jobData.jobDescription.jobName)}
            </CardTitle>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Full Name</label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Your Name"
                  value={employeeInfo.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={employeeInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Phone Number</label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Your Phone Number"
                  value={employeeInfo.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300">Cover Letter</label>
                <Textarea
                  name="coverLetter"
                  placeholder="Write a short cover letter"
                  rows={4}
                  value={employeeInfo.coverLetter}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  type="button"
                  onClick={handleNextStepClickEvent}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md transition duration-200"
                >
                  Next Step
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Model