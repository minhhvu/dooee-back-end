# dooee-web-app

## Build RESTful API for back end of the online course web app. 

### Courses (Done)
- List all courses
- List all courses in general
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Get single course
- Create new course
  * Authenticated users only
  * Must have the role "publisher" or "admin"
  * Only the owner or an admin can create a course for a bootcamp
  * Publishers can create multiple courses
- Update course
  * Owner only
- Delete course
  * Owner only

### Users & Authentication, Authorization (Done)
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Register as a "user" or "publisher"
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the users registered email address
  * A put request can be made to the generated url to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

### Videos (Not yet)
- List all videos in the database
  * Pagination, filtering, etc
- Get single video
- Create new video
  * Must have the role "admin" or "lecturer"
- Update tracks
  * Owner/admin only
  * Validation on update
- Delete Bootcamp
  * Owner/admin only
- Get videos from a course

## Security (Not yet)
- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

## Testing
- Unit Testing: using jet framework
- Integration Testing: using supertest to test middleware and routes
- Test-Drive Deployment

## Documentation
- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api

## Deployment
- Build EC2 on aws
- Deploy the server on EC2
