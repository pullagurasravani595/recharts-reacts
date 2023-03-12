// Write your code here

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="70%"
          cy="40%"
          data={vaccinationByAge}
          startAngle={0}
          endAngle={360}
          Radius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default VaccinationByAge
