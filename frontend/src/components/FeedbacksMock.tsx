import { useEffect, useState } from 'react';

interface Feedback {
    id: number;
    name: string,
    date: string,
    feedback: string
}

const FeedbacksMock: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[] | []>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('http://localhost:8000/feedbacks');
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }

                const data = await response.json();
                setFeedbacks(data);
            } catch (error: any) {
                setError(error.message);
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-2xl mb-4 px-20">Testimonials</h2>
            <ul className="flex flex-row justify-center flex-wrap gap-x-4">
                {feedbacks?.map((feedback) => (
                    <li className="w-72 h-80 shadow-lg rounded-lg flex flex-col justify-center py-3 px-4"
                     key={feedback.id}>
                        <strong><p className="text-lg mb-2">{feedback.name}</p></strong>
                        <p className="text-sm text-gray-500">{feedback.date}</p>
                        <p className="text-md mt-2">{feedback.feedback}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbacksMock;
// className='w-15 h-40 border-3 border-black'