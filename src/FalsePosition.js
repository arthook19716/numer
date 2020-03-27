import React, { useState , useEffect} from "react";
import axios from 'axios';
import './App.css';

import { Select,Table} from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import 'antd/dist/antd.css';


const { parse } = require("mathjs");
const { Column } = Table;
const { Option } = Select;


function FalsePosition() {

    let [xl, setxl] = useState();
    let [xr, setxr] = useState();
    let [fx, setfx] = useState();

    const data = []

    const [datashow, setdatashow] = useState();

    const [getafcs, setgetafcs] = useState();


    const [getafx, setgetafx] = useState();
    let [getaA, setgetaA] = useState()
    let [getaB, setgetaB] = useState()

   useEffect(() => {
       axios.get("http://localhost:3001/api/users/showFalsePosition").then(res => {

       const tempfcs = []

       const tempfx = []
       const tempA = []
       const tempB = []
       
       for (let i = 0; i < res.data.data.length; i++) 
         {
            tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>fn : {res.data.data[i].fx} <br/> xl : {res.data.data[i].a} <br/> xr: {res.data.data[i].b} </Option>)
            tempfx.push(res.data.data[i].fx)
            tempA.push(res.data.data[i].a)
            tempB.push(res.data.data[i].b)
         }
       setgetafcs(tempfcs)
       setgetafx(tempfx)
       setgetaA(tempA)
       setgetaB(tempB)
     })
    },[])


    function menu(value)
   {      
       setfx(getafx[value])
       setxl(getaA[value])
       setxr(getaB[value])

   }

    const falseposition = () => {
      
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const error = (x, letx) => Math.abs((x - letx) / x)
        var i = 0, x = 0, letx
        
        while (true) {

          letx = x
          x = ( (xl * f(fx,xr) ) - (xr * f(fx,xl) )) / ( f(fx,xr) - f(fx,xl) )



          if (f(fx, x) * f(fx, xl) > 0) 
          {
            xl = x
          }

          else 
          {
            xr = x
          }

          data.push({
            i: i,
            x: x.toFixed(6),
            fx: f(fx, x).toFixed(6),
            Error: error(x, letx).toFixed(6)
          });

            if(error(x, letx) <= 0.000001)
            {
              break;
            }

          i++;
        }

        setdatashow(data)
      }

      function set() {
        setxl(2);
        setxr(3);
        setfx('x^3-2x-5');
    }

        return(

                <div className = "App">

                    <div className = "topic-text">

                        <h1> False Position </h1>     

                    </div>

                    <div className = "work-space">

                    <div className="number-inputs">

                        <h2>fn</h2>

                        <input
                            placeholder="insert your function" 
                            value={fx}
                            onChange={event => setfx(event.target.value)} 
                        />

                        <h2> xl &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xr </h2>

                            
                                <input
                                    type="number"
                                    value={xl}
                                    onChange={e => setxl(+e.target.value)}
                                    placeholder="0"
                                />

                                <input
                                    type="number"
                                    value={xr}
                                    onChange={e => setxr(+e.target.value)}
                                    placeholder="0"
                                />
                        </div>
                    </div>

                    <button onClick={falseposition}>Calculate</button>

                     <h> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h>

                    <button onClick={set}>Auto Set</button>

                    
                    <Select defaultValue="set from db" style={{ width: 300 }}  onChange={menu}>

                           {getafcs}

                     </Select>


                    <div className = "App-table">

                      <Table style={{ marginTop: 30 }} dataSource={datashow}>
                        <Column title="Iterations" dataIndex="i" key="i" />
                        <Column title="x" dataIndex="x" key="x" />
                        <Column title="Fn(x)" dataIndex="fx" key="fx" />
                        <Column title="Error" dataIndex="Error" key="Error" />
                      </Table>

                    </div>

                    <LineChart
                        width={1900}
                        height={1000}
                        data={datashow}
                        margin={{ top: 30, right: 20, left: 80, bottom: 5 }}
                        style={{ backgroundColor: "#fff" }}
                    >

                    <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="x" />
                            <YAxis
                              type="number"
                              dataKey="fx"
                              domain={["auto", "auto"]}
                              allowDataOverflow="true"
                            />
                            <Tooltip />
                            <Legend />
                            <Line type="linear" dataKey="fx" stroke="#82ca9d" strokeWidth={4} />
                    </LineChart>

                </div>

        )
    
}
export default FalsePosition;
