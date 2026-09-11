// import Column from "../Column/Column";

// const Content = ({ loading }) => {
//   return (
//     <div className="container">
//       <div>
//         {["Новое", "В процессе", "Выучено"].map((title, i) => (
//           <Column loading={loading} title={title} key={i} />
//         ))}
//       </div>
//     </div>
//   );
// };

import Header from "../Header/Header";
import Main from "../Main/Main";

const Content = ({ loading }) => {
  return (
    <div>
      {loading ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // чтобы занять всю высоту экрана
            fontSize: "20px", // размер текста
            color: "#333", // цвет текста
          }}
        >
          Данные загружаются
        </p>
      ) : (
        (<>
          <Header />
           <Main />
        </>)
      )}
    </div>
  );
};

export default Content;
