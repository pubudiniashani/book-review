import HomeScreen from "./homescreen";
import LoginScreen from "./loginscreen";
import {useState} from "react";


export default function Index() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return isLoggedIn ? <HomeScreen /> : <LoginScreen onLogin={() => setIsLoggedIn(true)
    } />

}