import { X } from "lucide-react";







export default function Modal({children,title,showModal=false,setShowModal,className}) {

// const [showModal,setShowModal]=useState(true);


  return (
    <div className={`${showModal?"h-svh w-full bg-gray-600 bg-opacity-60 rounded-lg  fixed z-30 top-0 left-0 flex justify-center items-center":"hidden"} `}>
      <div className={`${className}   bg-white dark:bg-gray-900  z-20 rounded-lg  relative `}>
        <div>
          <p className="font-Nunito-ExtraBold text-black z-1 text-xl dark:text-white">{title}</p>
          <button onClick={()=>setShowModal(false)} className="text-xl absolute top-2 dark:text-white right-2"><X/></button>
        </div>
        <div className="w-full  dark:text-white">
           {children}
        </div>

      </div>
    </div>
  );
}


