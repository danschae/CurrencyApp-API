module.exports = (db) => {
  const validateUsers = (username, email) => {
    console.log(username)
    console.log("this is the email", email)
    const queryString = `
    SELECT username, email
    FROM users
    WHERE username = $1 OR email = $2;
    `
    const queryParams = [username, email];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows
      })
  }

  const registerUser = (username, email, password) => {
    const queryString = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `
    const queryParams = [username, email, password]
    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows[0]
    })
  }
  return {
    validateUsers,
    registerUser
  }
}