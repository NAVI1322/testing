import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface Candidate {
  candidateName: string;
  experienceLevel: string;
  education: string;
  preferredJobType: string;
  skills: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null; // Updated to be more specific and handle null
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, candidate }) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-80">
      <div className="dark:bg-black bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transition-transform transform scale-100">
        <h2 className="text-2xl font-semibold  mb-2">{candidate.candidateName}</h2>
        <div className="border-b border-gray-300 pb-4 mb-4">
          <p className="text-gray-500">Experience Level: <span className="font-bold">{candidate.experienceLevel}</span></p>
          <p className="text-gray-500">Education: <span className="font-bold">{candidate.education}</span></p>
          <p className="text-gray-500">Preferred Job Type: <span className="font-bold">{candidate.preferredJobType}</span></p>
          <p className="text-gray-500">Skills: <span className="font-bold">{candidate.skills.join(', ')}</span></p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => alert('Viewing Resume')} className="hover:bg-blue-600 hover:text-white transition">
            View Resume
          </Button>
          <Button variant="outline" onClick={() => alert('Viewing Score')} className="hover:bg-blue-600 hover:text-white transition">
            View Score
          </Button>
          <Button variant="outline" onClick={() => alert('Sending Interview Invite')} className="hover:bg-blue-600 hover:text-white transition">
            Send Interview Invite
          </Button>
          <Button variant="outline" onClick={() => alert('Shortlisting Candidate')} className="hover:bg-blue-600 hover:text-white transition">
            Shortlist
          </Button>
          <Button variant="outline" onClick={() => alert('Rejecting Candidate')} className="hover:bg-red-600 hover:text-white transition">
            Reject
          </Button>
          <Button variant="outline" onClick={() => alert('Waitlisting Candidate')} className="hover:bg-yellow-600 hover:text-white transition">
            Waitlist
          </Button>
          <Button variant="outline" onClick={() => alert('Accepting Candidate')} className="hover:bg-green-600 hover:text-white transition">
            Accept
          </Button>
        </div>

        <Button variant="myButton" className="mt-6 w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
