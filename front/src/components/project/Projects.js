import React, { useEffect, useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import ProjectAddForm from "./ProjectAddForm"
import Project from "./Project"
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {

    const [isEditing, setIsEditing] = useState(false);

    const [projects, setProjects] = useState([
    //   {
    //   title : "웹프로젝트",
    //   description : "포트폴리오 웹사이트 제작",
    //   from : "2022-08-23",
    //   to : "2022-09-12",
    //   _id: 0,
    //   },
    //  {
    //   title : "웹프로젝트",
    //   description : "포트폴리오 웹사이트 제작",
    //   from : "2022-08-23",
    //   to : "2022-09-12",
    //   _id: 1,
    //   },
    
    ]
);

  useEffect(() => {
    Api.get(`project/projects`, portfolioOwnerId).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);


    return <>

     <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <h5>프로젝트</h5>

        {/* 편집Form 설정 : isEditing이 False면 편집창이 닫힘 */}

        {
        (projects.map((project) => {
          return(
         
          <Project project={project}
                   key={project._id}
                   projects={projects}
                   setProjects={setProjects}
                   isEditable={isEditable}
                   />    
            )} 
          ))
        }

        {/* ProjectAddForm 설정 ( + 버튼 ) */}
        {isEditable && (<Form.Group className="mt-3 text-center">
        <Button variant="primary" className="mt-3" onClick={()=>{
          setIsEditing(true) 
        }}>+</Button>
        </Form.Group>
        )}
        {isEditing && 
        <ProjectAddForm 
              projects={projects}
              setProjects={setProjects}
              setIsEditing={setIsEditing} />}
        
      </Card.Body>
    </Card>
    </>
}

export default Projects;
