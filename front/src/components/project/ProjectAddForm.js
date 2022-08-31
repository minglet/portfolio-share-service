import React, { useEffect, useState } from "react";
import { Card, InputGroup, Form, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";

function ProjectAddForm({ projects, setProjects, setIsEditing }) {

    const [inputs, setInputs] = useState({
      title: '',
      description: '',
      from: '',
      to: ''
    });

    const { title, description, from, to } = inputs;

    const onChange = (e) => {
      const { value, name } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
      enableButton(e.target.value)
      setIsTitleValid({[title]: value})
    };

    // // 필수값 입력 확인하기

    // // title이 1글자 이상인지 여부를 확인
    // const isTitleEntered = title.length >= 1;
    // // 필수값이 입력 되었는지 확인하는 isTitleValid 함수 만들기
    // const isTitleValid = isTitleEntered(title);


// Api.post로 입력된 데이터 전송하기
// 모든 값이 입력되어 있지 않다면 "모두 입력해주세요" 안내 띄우기
    const handleSubmit = async (e) => {
      e.preventDefault()
      try{
         await Api.post(`project/add`, {
          title: title,
          description: description,
          from: from,
          to: to
        })
        .then((res)=>{
          
          let data = res.data
          setProjects([...projects, data])})
      } catch (e) {
        console.log("실패");
        setIsFormValid(
        <Form.Text className="text-success">
        모두 입력해주세요.
        </Form.Text>)
        
      }
    }
  // 확인버튼 눌렀을 때 필수값 입력 확인 (시도중)
    const [isFormValid, setIsFormValid] = useState()

    const project = projects.forEach((project)=>{
      return project
    })

    const [text, enableButton] = useState("");

  return <>
      <Card.Body>
      <Row className="justify-content-md-center mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="프로젝트 제목"
            autoComplete="off"
            onChange={onChange}
            name="title"
            value={title}
          />
          {/* { isTitleValid && (
          <Form.Text className="text-success">
          필수 입력값입니다.
          </Form.Text>)} */}
          </Form.Group>

          <InputGroup className="mb-3">
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="상세내역"
            autoComplete="off"
            onChange={onChange}
            name="description"
            value={description}
          />
          </InputGroup>
          <input type="date" 
            onChange={onChange} 
            name="from"
            value={from}/>
          <input type="date" 
            onChange={onChange}
            name="to"
            value={to}/>
          <br/>
          <Form.Group as={Row} className="mt-3 text-center">

          {/* 모두 입력했는지 확인 */}
          {isFormValid}
          {/* {
          project.to.value > project.from.value ? 
          (<Form.Text className="text-success">
            기간 설정 다시해!!.
           </Form.Text>) : null
        } */}

          <Col sm={{ span: 20 }}>
          <Button 
          variant="primary" 
          type="submit" 
          className="me-3"
          disabled={!text}
          >확인</Button>
          <Button variant="secondary" onClick={(e)=>{
            setIsEditing(false)
          }}>취소</Button>
          </Col>
          </Form.Group>
          </Form>
          </Row>
        </Card.Body>
      </>
    }


export default ProjectAddForm;