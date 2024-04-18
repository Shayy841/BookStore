import axios from "axios"; // to hit api of backend
import { useEffect, useState } from "react"; //to render component/page/data
import SERVERURL from "../ServerURL.jsx";
import { LiaInfoSolid } from "react-icons/lia";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const Home = () => {
  const [books, setBooks] = useState([]); //can store array objects 
  const [loading, setLoading] = useState(false); // to show loading of page
  const fetchBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${SERVERURL}/book`);
      console.log(resp.data);
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);
  return (
    <>
      <h1 className="text-3xl my-8 bg-sky-700 text-white p-4 text-center">Book Store</h1>
      <div className="p-4 ">
        <Link to={"/books/create"}><MdAddBox className="text-4xl text-pink-600" /></Link>
        <div className="flex justify-between items-center">
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-full border-separate border-spacing-2 ">
              <thead>
                <tr>
                  <th className="border border-slate-500 rounded-md">Sno</th>
                  <th className="border border-slate-500 rounded-md">Title</th>
                  <th className="border border-slate-500 rounded-md">Author</th>
                  <th className="border border-slate-500 rounded-md">Year</th>
                  <th className="border border-slate-500 rounded-md">Options</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => {
                  return (
                    <tr key={book._id} >
                      <td className="border border-slate-500 rounded-md text-center">{index + 1}</td>
                      <td className="border border-slate-500 rounded-md text-center">{book.title}</td>
                      <td className="border border-slate-500 rounded-md text-center">{book.author}</td>
                      <td className="border border-slate-500 rounded-md text-center">{book.year}</td>
                      <td className="border border-slate-500 rounded-md text-center flex items-center justify-center"><Link to={`/books/${book._id}`}><LiaInfoSolid className="text-2xl text-blue-800" /></Link><Link to={`/books/edit/${book._id}`}><FaEdit className="text-2xl text-green-600" /></Link><Link to={`/books/delete/${book._id}`}><MdOutlineDeleteForever className="text-2xl text-red-700" /></Link> </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
