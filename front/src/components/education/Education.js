import React,{useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap"
import EducationAddForm from "./EducationAddForm";
import EducationCards from "./EducationCards"
import * as Api from "../../api";

//icon
import Plus from '../icon/plus.png'

function Education ({portfolioOwnerId, isEditable}) {
    
    const [isAddingEducation, setIsAddingEducation] = useState(false);
    const [educationData, setEducationData] = useState([]);
    
    //전체 Education 데이터 불러오기
    useEffect(() => {
        // 요청을 하고, educationData를 response의 data로 세팅함.
        Api.get("education/info", portfolioOwnerId).then((res) => setEducationData(res.data));
      }, [portfolioOwnerId]);


    return (
        <>
            <Card className="mb-2 ms-3 mr-5" >
                <Card.Body>
                    <Card.Title
                        style={{padding: '35px', fontWeight: "bolder"}}>학력</Card.Title>
            
                    <EducationCards
                            educationData={educationData}
                            setEducationData={setEducationData}
                            isEditable={isEditable}/>
                      {/* +버튼 */}
                      {isEditable && (
                        <img 
                            src={Plus}
                            type="button" onClick={() => setIsAddingEducation(true)}/>
                    )}
                    {isAddingEducation && (
                        <EducationAddForm
                            setIsAddingEducation={setIsAddingEducation}
                            educationData={educationData}
                            setEducationData={setEducationData}
                        />
                    )}
                </Card.Body>
            </Card>
                        
        </>
    )
}

export default Education