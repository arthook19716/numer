import React, { useState , useEffect} from "react";
import axios from 'axios';
import './App.css';

import { Select,Table} from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import 'antd/dist/antd.css';

const { parse } = require("mathjs");
const { Column } = Table;
const { Option } = Select;

function Newton() {

    let [x, setx] = useState();
    let [fx, setfx] = useState();

    const data = []

    const [datashow, setdatashow] = useState();

    const [getafcs, setgetafcs] = useState();


    const [getafx, setgetafx] = useState();
    let [getaA, setgetaA] = useState()

   useEffect(() => {
       axios.get("http://localhost:3001/api/users/showNewton").then(res => {

       const tempfcs = []

       const tempfx = []
       const tempA = []
       
       for (let i = 0; i < res.data.data.length; i++) 
         {
            tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>fn : {res.data.data[i].fx} <br/> x0 : {res.data.data[i].a}  </Option>)
            tempfx.push(res.data.data[i].fx)
            tempA.push(res.data.data[i].a)
         }
       setgetafcs(tempfcs)
       setgetafx(tempfx)
       setgetaA(tempA)
     })
    },[])


    function menu(value)
   {      
       setfx(getafx[value])
       setx(getaA[value])

   }


    const newton = () => {
      
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const error = (x, tri) =>  100*(Math.abs((tri / x))); 
        var i = 0, letx ,tri

        
        while (true) {

          letx = x
          tri = - ( f(fx,x) / (x*2) )

          x = letx + tri

          data.push({
            i: i,
            x: letx.toFixed(6),
            fx: f(fx, x).toFixed(6),
            Error: error(x, tri).toFixed(6)
          });

          

            if(error(x, tri) <= 0.000001){

              break;

            }

          i++;
        }

        setdatashow(data)
      }

      function set() {

        setx(2);

        setfx('x^2-7');
    }

        return(

                <div className = "App">

                    <div className = "topic-text">

                        <h1> Newton-Raphson </h1>     

                    </div>

                    <div className = "work-space">

                    <div className="number-inputs">

                        <h2>fn</h2>

                        <input
                            placeholder="insert your function" 
                            value={fx}
                            onChange={event => setfx(event.target.value)} 

                        />

                        <h2> x0 </h2>                
                                <input
                                    type="number"
                                    value={x}
                                    onChange={e => setx(+e.target.value)}
                                    placeholder="0"
                                />
                        </div>
                    </div>

                    <button onClick={newton}>Calculate</button>

                    <h> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h>

                    <button onClick={set}>Auto set</button>

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
export default Newton;
