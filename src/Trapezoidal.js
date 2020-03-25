import React, { useState , useEffect} from "react";
import './App.css';

import { Select,Table} from 'antd';

import 'antd/dist/antd.css';
import axios from 'axios';

const { Column } = Table;
const { Option } = Select;

const { parse,create,all } = require("mathjs");
const mathjs = create(all);
const mathInt = require('mathjs-simple-integral');
mathjs.import(mathInt)

function Trapezoidal() {

    let [a, seta] = useState();
    let [b, setb] = useState();
    let [fx, setfx] = useState();

    const queue_data = []

    const [datashow, setdatashow] = useState();

  const [getafcs, setgetafcs] = useState();
  const [getafx, setgetafx] = useState();
  let [getaA, setgetaA] = useState()
  let [getaB, setgetaB] = useState()

    useEffect(() => {
      axios.get("http://localhost:3001/api/users/showtrap").then(res => {

        const tempfx = []
        const tempfcs = []
        const tempA = []
        const tempB = []
        
        for (let i = 0; i < res.data.data.length; i++) {
          tempfcs.push(<Option key={i} value={i} label={res.data.data[i].fx}>fn : {res.data.data[i].fx} <br/> a : {res.data.data[i].a} <br/> b: {res.data.data[i].b} </Option>)
          tempfx.push(res.data.data[i].fx)
          tempA.push(res.data.data[i].a)
          tempB.push(res.data.data[i].b)

        }
        setgetafcs(tempfcs)
        setgetafx(tempfx)
        setgetaA(tempA)
        setgetaB(tempB)
      })
    }, [])


    function menu(value){

      
          setfx(getafx[value])
          seta(getaA[value])
          setb(getaB[value])

    }

    const trap = () => {
      
        const f = (fx, value) => parse(fx).evaluate({ x: value })
        const inte =  mathjs.integral(fx,'x')
        const toString = inte.toString()
        

        const eror = (ans, I) => ((ans - I) / ans)*100
        
        var x0,x1,I,a1,a2,ans
        var I2 = ""

        x0 = f(fx,a)
        x1 = f(fx,b)
        I = ((b-a)/2)*(x0+x1)

        I2 = toString

        a1 = f(I2,a)
        a2 = f(I2,b)

        ans = a2-a1

          queue_data.push({
            
            x0: x0.toFixed(6),
            x1: x1.toFixed(6),
            I: I.toFixed(6),
            ans: ans.toFixed(6),
            error: eror(ans, I).toFixed(2)+" %"
          });

        

        setdatashow(queue_data)
      }

      function set() {

        setfx('(2*(x^3))-(5*(x^2))+(3*x)+1');
        seta(0);
        setb(2);
        
    }

    const span = (<h>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h>);

        return(

                <div className = "App">

                    <div className = "up-extext">

                        <h1> Trapezoidal Rule </h1>     

                    </div>

                    <div className = "text-topic">


                          <h2>fn</h2>

                          <input

                              placeholder="input function" 
                              value={fx}
                              onChange={event => setfx(event.target.value)} 

                          />

                          <h2> a {span}{span} b </h2>

                              
                                  <input
                                      type="number"
                                      value={a}
                                      onChange={e => seta(+e.target.value)}
                                      placeholder="0"
                                  />

                                  <input
                                      type="number"
                                      value={b}
                                      onChange={e => setb(+e.target.value)}
                                      placeholder="0"
                                  />


                    </div>

                    <button onClick={trap}>Add Them!</button>

                    {span}
                    
                    <button onClick={set}>Set!</button>

                    {span}


                       <Select defaultValue="set from db" style={{ width: 300 }}  onChange={menu}>

                           {getafcs}

                       </Select>
      

                    <div className = "App-table">

                      <Table style={{ marginTop: 30 }} dataSource={datashow}>
                        <Column title="x0" dataIndex="x0" key="x0" />
                        <Column title="x1" dataIndex="x1" key="x1" />
                        <Column title="I" dataIndex="I" key="I" />
                        <Column title="Ans" dataIndex="ans" key="ans" />
                        <Column title="Error" dataIndex="error" key="error" />
                      </Table>

                    </div>


                </div>

        )
    
}
export default Trapezoidal;