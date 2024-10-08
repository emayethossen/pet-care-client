"use client"

import { useSearchParams } from 'next/navigation';
import PaymentComponent from '../../components/pages/Payment';

const Premium = () => {
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');  // Get postId from query params

    if (!postId) {
        return <div>Loading...</div>;  // Show loading until postId is available
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">Premium Content Access</h1>
            {/* Render the PaymentComponent with the postId */}
            <PaymentComponent postId={postId} />
        </div>
    );
}

export default Premium;
