export default function RegisterForm({ toggleLogin }: { toggleLogin: Function}) {
    return (
        <div className="w-3/5 h-fit">
            <form>
                <div className="flex flex-col gap-6">
                    <div className="w-full text-center text-5xl mb-10">Create account</div>
                    <label className="-mb-4">Name</label>
                    <input placeholder="Enter your Email" className="border border-gray-400 py-3 pl-3 rounded shadow-sm" />
                    <label className="-mb-4">Email</label>
                    <input placeholder="Enter your Email" className="border border-gray-400 py-3 pl-3 rounded shadow-sm" />
                    <label className="-mb-4">Password</label>
                    <input placeholder="Enter your Email" className="border border-gray-400 py-3 pl-3 rounded shadow-sm" />
                    <label className="-mb-4">Confirm Password</label>
                    <input placeholder="Enter your Password" className="border border-gray-400 py-3 pl-3 rounded shadow-sm" />
                    <button className="w-full mt-4 bg-green-400 py-3 text-lg font-semibold rounded">Register</button>
                    <div className="w-full border-t border-gray-300 pt-3 text-center text-sm" onClick={() => toggleLogin()} >Already registered? Login into your account</div>
                </div>
            </form>
        </div>
        
    )
}