// Write your code here

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer>
      <BarChart
        width={1000}
        height={300}
        data={last7DaysVaccination}
        margin={{
          top: 5,
        }}
      >
        <XAxis dataKey="vaccineDate" />
        <YAxis tickFormatter={DataFormatter} />
        <Legend wrapperStyle={{padding: 20}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#2d87bb" barSize="8%" />
        <Bar dataKey="dose2" name="Dose 2" fill=" #f54394" barSize="8%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
