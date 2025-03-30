import { Button } from "@mantine/core";
import { Login } from "./Login/Login";
import { Registration } from "./Registration/Registration";
import { useState } from "react";

export function Authentication() {

      const [isLogin, setLogin] = useState(true);

    return(
        <>
          {isLogin ? <Login /> : <Registration />}
          <Button onClick={() => setLogin(!isLogin)}>{isLogin? "Regist" : "Login"}</Button>
        
        </>
    )
}