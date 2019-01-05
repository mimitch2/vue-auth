<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Email = {{email}}</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
   created(){
    // try {
    //   const getIt = await axios.get(
    //     "https://authentication-6e029.firebaseio.com/users.json"
    //   );
    //   const data = await getIt.data;
    //   const users = [];
    //   for (const key in data) {
    //     const user = data[key];
    //     user.id = key;
    //     users.push(user);
    //   }
    //   console.log(users);
    //   this.email = users[0].email;
    // } catch (error) {
    //   console.log(error);
    // }

    axios
      .get("/users.json")
      .then(res => {
        const data = res.data;
        const users = [];
        for (const key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        console.log(users);
        this.email = users[0].email;
        sessionStorage.email = users[0].email;
        console.log(sessionStorage);
      })
      .catch(error => console.log(error));
  },
  data() {
    return {
      email: ""
    };
  }
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: red;
}
</style>