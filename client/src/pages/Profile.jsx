const Profile = () => {
  return (
    <main className="p-3 max-w-lg mx-auto my-6 mt-32">

        <form className="flex flex-col gap-4">
          <input
            type="file"
            hidden
            accept="image/*"

          />
          <img
            src={'/cover_foto.jpg'}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover self-center mt-3 
              cursor-pointer hover:brightness-90"
          />
          <h1 className="text-center py-2 border-b drop-shadow-md">Profile</h1>
          <input type="text" className="mt-4 mx-5 bg-neutral-100 p-3 rounded border-b" placeholder="username"/>
          <input type="email" className=" mx-5 bg-neutral-100 p-3 rounded border-b" placeholder="email"/>
          <input type="password" className=" mx-5 bg-neutral-100 p-3 rounded border-b" placeholder="password"/>
          <button className="bg-neutral-800 p-3 mx-5 capitalize hover:shadow-lg text-neutral-50 rounded">Update</button>
        </form>
        <div className=" flex justify-between mx-5 mt-4">
          <button className="text-md font-medium text-amber-600 hover:underline">Delete user</button>
          <button className="text-md font-medium text-amber-600 hover:underline">Log out</button>
        </div>
    </main>
  );
};
export default Profile;
