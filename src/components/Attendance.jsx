import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';

function Attendance(){
    const [totalClasses,setTotalClasses] = useState();
    const [attendedClasses,setAttendedClasses] = useState();
    const [attendanceToday,setAttendanceToday] = useState();
    const [totalToday,setTotalToday] = useState(0);
    const [displayedAttendanceToday, setDisplayedAttendanceToday] = useState();
    const [displayedTotalToday, setDisplayedTotalToday] = useState();
    const [showAlert,setShowAlert] = useState(false);
    const [updated,setUpdated] = useState(false);
    const [lastUpdated,setLastUpdated] = useState();
    const [editTotalAttended, setEditTotalAttended] = useState();
    const [editTotalHeld, setEditTotalHeld] = useState();

    const classes = {
        1: 6,
        2: 7,
        3: 4,
        4: 4,
        5: 7,
        6: 4,
        7: 0
    }
    function getTodayDate() {
        const d = new Date();
        const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    
        return date;
    }
    


    function updateAttendance() {
        if(updated){
            alert("attendance already updated for today reset attendance to change it")
            return;
        }
        if (isNaN(attendanceToday) || isNaN(totalToday)) {
            alert("Enter fucking Numbers you fucker");
            return;
        }
        if (attendanceToday > totalToday) {
            alert("Do you think i am stupid, please enter valid fucking values");
            return;
        }
        if( totalToday > 10 || attendanceToday > 10){
            alert("Do you think i am stupid, please enter valid fucking values");
            return;
        }

        //code to update the attendance in the storage
        setUpdated(true);
        setDisplayedAttendanceToday(attendanceToday);
        setDisplayedTotalToday(totalToday);

        setAttendedClasses(a => a + attendanceToday);
        setTotalClasses(t =>t + totalToday);

        saveData(attendedClasses + attendanceToday, totalClasses + totalToday);

        
    }

    function resetAttendance(){
        const storedTotalClasses = parseInt(localStorage.getItem("totalClasses"));
        const storedAttendedClasses = parseInt(localStorage.getItem("attendedClasses"));
        const storedAttendedToday = parseInt(localStorage.getItem("attendedToday"));
        const storedTotalToday = parseInt(localStorage.getItem("totalToday"));

        setAttendanceToday(0);
        setTotalClasses(storedTotalClasses - storedTotalToday);
        setAttendedClasses(storedAttendedClasses - storedAttendedToday);

        setDisplayedAttendanceToday(0);
        setTotalToday(getTodayClasses());

        localStorage.setItem("totalClasses",storedTotalClasses - storedTotalToday);
        localStorage.setItem("attendedClasses",storedAttendedClasses - storedAttendedToday);
        localStorage.setItem("attendedToday",0);
        localStorage.setItem("totalToday",0)

        localStorage.setItem("lastUpdated","never");

        setUpdated(false);


    }
    function getTodayClasses(){
        const d = new Date();
        const day = d.getDay();
        return classes[day];

    }
    useEffect(() => {
        const todayClasses = getTodayClasses();
        setTotalToday(todayClasses);
        loadData();
    }, []);

    
    function saveData(attended, total) {
        localStorage.setItem("attendedClasses", attended);
        localStorage.setItem("totalClasses", total);
        localStorage.setItem("lastUpdated",getTodayDate());
        localStorage.setItem("attendedToday", attendanceToday);
        localStorage.setItem("totalToday", totalToday);

        const d = new Date();

    }
    
    function loadData() {
        const storedAttended = parseInt(localStorage.getItem("attendedClasses")) || 0;
        const storedTotal = parseInt(localStorage.getItem("totalClasses")) || 0;
        setAttendedClasses(storedAttended);
        setTotalClasses(storedTotal);

        const storedAttendedToday = parseInt(localStorage.getItem("attendedToday")) || 0;
        const storedTotalToday = parseInt(localStorage.getItem("totalToday")) || 0;

        
        setAttendanceToday(storedAttendedToday);

        setDisplayedAttendanceToday(storedAttendedToday);
        setDisplayedTotalToday(storedTotalToday);

    
        const storedLastUpdated = localStorage.getItem("lastUpdated");
        setLastUpdated(storedLastUpdated);
    
        const todayDate = getTodayDate();
    
        // Check if attendance has been updated today
        if (storedLastUpdated === todayDate) {
            setUpdated(true);
        } else {
            setUpdated(false);
        }
    }
    

function handleAttendanceChange(e) {
    const value = parseInt(e.target.value);
    setAttendanceToday(value);
    console.log(value)

}

function handleTotalTodayChange(e) {
    const value = parseInt(e.target.value);
    setTotalToday(value);

}

function handleEditTotalAttendedChange(e) {
    setEditTotalAttended(parseInt(e.target.value));
}

function handleEditTotalHeldChange(e) {
    setEditTotalHeld(parseInt(e.target.value));
}

function updateTotalsDirectly() {
    if (isNaN(editTotalAttended) || isNaN(editTotalHeld)) {
        alert("Please enter valid numbers for both fields.");
        return;
    }
    if (editTotalAttended > editTotalHeld) {
        alert("Total classes attended cannot be greater than total classes held.");
        return;
    }
    setAttendedClasses(editTotalAttended);
    setTotalClasses(editTotalHeld);
    localStorage.setItem("totalClasses",editTotalHeld);
    localStorage.setItem("attendedClasses",editTotalAttended);
    alert("Totals updated successfully!");
}

return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <Container className='tracker-container bg-white'>
            <p className='tracker-title'>Attendance Tracker</p>
            <Form>
              <Form.Group>
                <Form.Label>No. of classes attended today</Form.Label>
                <Form.Control 
                  className='input-form' 
                  type="number"
                  value={attendanceToday} 
                  onChange={handleAttendanceChange} 
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Total classes Today</Form.Label>
                <Form.Control 
                  type='number' 
                  className='input-form'
                  value={totalToday} 
                  onChange={handleTotalTodayChange} 
                />
              </Form.Group>
              
              <Button className='btn btn-dark mt-2' onClick={updateAttendance}>Update Attendance</Button>
            </Form>
            <Container className='info-container mt-3'>
              <p className='info-text'>Today's Attendance</p>
              {updated ? (
                <div>
                  <p>Attended: {displayedAttendanceToday}</p>
                  <p>Total: {displayedTotalToday}</p>
                </div>
              ) : (
                <p>No attendance recorded for today.</p>
              )}
            </Container>
            <Container className='info-container mt-3'>
              <p className='info-text'>Cumulative Attendance</p>
              <div>
                <p>Total classes Attended: {attendedClasses}</p>
                <p>Total classes held: {totalClasses}</p>
                <p>Percentage: {((attendedClasses / totalClasses) * 100).toFixed(2)}%</p>
              </div>
            </Container>
            <Button className='btn btn-dark mt-3' onClick={resetAttendance}>Reset Attendance</Button>
          </Container>
        </Col>
        
        <Col>
          <Container className='tracker-container bg-white h-50'>
            <p className='info-text'>Edit Totals Directly</p>
            <Form>
              <Form.Group>
                <Form.Label>Total Classes Attended</Form.Label>
                <Form.Control 
                  className='input-form' 
                  type="number"
                  value={editTotalAttended} 
                  onChange={handleEditTotalAttendedChange} 
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Total Classes Held</Form.Label>
                <Form.Control 
                  type='number' 
                  className='input-form'
                  value={editTotalHeld} 
                  onChange={handleEditTotalHeldChange} 
                />
              </Form.Group>
              
              <Button className='btn btn-warning mt-3' onClick={updateTotalsDirectly}>Update Totals Directly</Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );

}

export default Attendance;