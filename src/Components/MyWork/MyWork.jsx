import React from "react";
import "./MyWork.css";
import mywork_data from "../../assets/mywork_data";

const MyWork = () => {
  return (
    <div id="projects" className="mywork">
      <div className="mywork-title">
        <h1>My latest work</h1>
      </div>
      <div className="mywork-container">
        {mywork_data.map((work, index) =>
          work.w_link ? (
            <a
              key={index}
              href={work.w_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LazyLoadImage
                className="myworkimage"
                src={work.w_img}
                alt={work.w_name}
                effect="blur"
              />
            </a>
          ) : (
            <LazyLoadImage
              className="myworkimage"
              key={index}
              src={work.w_img}
              alt={work.w_name}
              effect="blur"
            />
          )
        )}
      </div>
    </div>
  );
};

export default MyWork;
