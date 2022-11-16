import React , {useState , useEffect , useContext , createContext} from 'react'
import {auth} from '../firebase';
import axios from "axios";
import { CoinList } from "../config/api";
import { onAuthStateChanged } from 'firebase/auth';

const Crypto = createContext();

const CryptoContext = (props) => {
    const [currency, setcurrency] = useState("INR");
    const [symbol, setsymbol] = useState("Rs");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user , setUser] = useState(null);
    const [alert, setAlert] = useState({
      open : false ,
      message : "",
      type : "success",
    });
    
    useEffect(()=>{
      onAuthStateChanged(auth , (user)=>{
        if(user)
        {
          setUser(user);
        }
        else setUser(null);
      });
    },[]);


    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data); 
      setLoading(false);
    };


    useEffect(() => {
    if(currency === "INR")setsymbol("Rs");
    else if(currency === "USD")setsymbol("$");
    }, [currency])
    

    return (
    <Crypto.Provider value={{currency , symbol , setcurrency , coins , loading , fetchCoins , alert , setAlert , user}}>
    {props.children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = ()=>
{
    return useContext(Crypto);
}