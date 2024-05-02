import { useSelector } from "react-redux";
import { HiLogout } from "react-icons/hi";
import { TiUserDelete } from "react-icons/ti";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

  const dispatch = useDispatch();
  // 1. Create a function to handle file upload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  // 1.1 handle file upload
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  // 2. Create a function to handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // 3. Create a function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  // 4. Create a function to delete user
  const handleDelete = async () => {
    
  };
  // 5. Create a function to log out user
  const handleLogout = async () => {};

  return (
    <main className="p-3 max-w-lg mx-auto my-6 mt-32">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center mt-3 
              cursor-pointer hover:brightness-90"
          onClick={() => fileRef.current.click()}
        />
        <h1 className="text-center py-2 border-b drop-shadow-md">Profile</h1>
        <p className=" text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-600">
              Error uploading file (Image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-neutral-600">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-cyan-500 bg-slate-50 p-2 w-full rounded">
              Image uploaded successfully!😀
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          className="mt-4 mx-5 bg-neutral-100 p-3 rounded border-b"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className=" mx-5 bg-neutral-100 p-3 rounded border-b"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className=" mx-5 bg-neutral-100 p-3 rounded border-b"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          className="bg-neutral-800 p-3 mx-5 uppercase hover:shadow-lg 
              text-neutral-50 rounded disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "loading..." : "update"}
        </button>
      </form>
      <div className=" flex justify-between gap-8 py-4 mx-6 mt-4">
          <button
            onClick={handleDelete}
            className="text-xl font-medium text-cyan-600 hover:underline"
          >
            <TiUserDelete />
          </button>
          <button
            onClick={handleLogout}
            className="text-xl font-medium text-cyan-600 hover:underline"
          >
            <HiLogout />
          </button>
      </div>
    </main>
  );
};
export default Profile;
