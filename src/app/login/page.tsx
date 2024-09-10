import LoginForm from '@/components/ui/login/loginform';
import LoginDrawing from '@/components/ui/login/logindrawing';

export default function LoginPage() { 

    return (
        <div className="h-full flex">
            <div className="w-2/5 h-full flex items-center justify-center">
                <LoginForm />
            </div>
            <div className="w-3/5 h-full bg-green-400 rounded shadow-md shadow-gray-500 flex items-center justify-center text-9xl font-semibold text-">
                <LoginDrawing width={600} height={600} />
            </div>
        </div>
    )
}