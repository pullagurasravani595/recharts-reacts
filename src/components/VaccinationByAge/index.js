// Write your code here

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <div className="container">
      <h1 className="heading">Vaccination by age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart className="chart-container">
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            Radius="20%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="center"
            className="new-container"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
