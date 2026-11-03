1. GET all                                                                                                                
   GET http://localhost:3000/api/resources                                                                                
   Expected: 200   Actual: 200   -> PASS                                                                                  
   Body: [{"id":1,"title":"Express","completed":false},{"id":2,"title":"REST API","completed":false}]

2. GET one
   GET http://localhost:3000/api/resources/1
   Expected: 200   Actual: 200   -> PASS
   Body: {"id":1,"title":"Express","completed":false}
                                                                                                                          
3. GET missing                                                                                                            
   GET http://localhost:3000/api/resources/99                                                                             
   Expected: 404   Actual: 404   -> PASS                                                                                  
   Body: {"error":"Resource not found"}

4. POST valid
   POST http://localhost:3000/api/resources
   Expected: 201   Actual: 201   -> PASS
   Body: {"id":3,"title":"Write tests","completed":false}
                                                                                                                          
5. POST no title                                                                                                          
   POST http://localhost:3000/api/resources                                                                               
   Expected: 400   Actual: 400   -> PASS                                                                                  
   Body: {"error":"title is required"}

6. PUT valid
   PUT http://localhost:3000/api/resources/1
   Expected: 200   Actual: 200   -> PASS
   Body: {"id":1,"title":"Express","completed":true}
                                                                                                                          
7. PUT missing                                                                                                            
   PUT http://localhost:3000/api/resources/99                                                                             
   Expected: 404   Actual: 404   -> PASS                                                                                  
   Body: {"error":"Resource not found"}

8. DELETE valid
   DELETE http://localhost:3000/api/resources/2
   Expected: 200   Actual: 200   -> PASS
   Body: {"id":2,"title":"REST API","completed":false}
                                                                                                                          
9. DELETE repeat                                                                                                          
   DELETE http://localhost:3000/api/resources/2                                                                           
   Expected: 404   Actual: 404   -> PASS                                                                                  
   Body: {"error":"Resource not found"}

10. GET after delete
   GET http://localhost:3000/api/resources
   Expected: 200   Actual: 200   -> PASS
   Body: [{"id":1,"title":"Express","completed":true},{"id":3,"title":"Write tests","completed":false}]

===== SUMMARY =====

Test Endpoint         Expected Actual Result
---- --------         -------- ------ ------
   1 GET all               200    200 PASS  
   2 GET one               200    200 PASS  
   3 GET missing           404    404 PASS  
   4 POST valid            201    201 PASS  
   5 POST no title         400    400 PASS  
   6 PUT valid             200    200 PASS  
   7 PUT missing           404    404 PASS  
   8 DELETE valid          200    200 PASS  
   9 DELETE repeat         404    404 PASS  
  10 GET after delete      200    200 PASS  
