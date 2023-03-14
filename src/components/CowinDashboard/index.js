// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    responseObj: {},
  }

  componentDidMount() {
    this.getResponseDetails()
  }

  getResponseDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstraints.inProgress,
    })

    const url = `https://apis.ccbp.in/covid-vaccination-data`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const newData = await response.json()

      const updateData = {
        last7DaysVaccination: newData.last_7_days_vaccination.map(
          eachVaccination => ({
            vaccineDate: eachVaccination.vaccine_date,
            dose1: eachVaccination.dose_1,
            dose2: eachVaccination.dose_2,
          }),
        ),
        vaccinationByAge: newData.vaccination_by_age.map(eachItem => ({
          age: eachItem.age,
          count: eachItem.count,
        })),
        vaccinationByGender: newData.vaccination_by_gender.map(eachValue => ({
          gender: eachValue.gender,
          count: eachValue.count,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstraints.success,
        responseObj: {...updateData},
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderVaccinationCoverage = () => {
    const {responseObj} = this.state
    const {last7DaysVaccination} = responseObj

    return <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
  }

  renderVaccinationByGender = () => {
    const {responseObj} = this.state
    const {vaccinationByGender} = responseObj

    return <VaccinationByGender vaccinationByGender={vaccinationByGender} />
  }

  renderVaccinationByAge = () => {
    const {responseObj} = this.state
    const {vaccinationByAge} = responseObj

    return <VaccinationByAge vaccinationByAge={vaccinationByAge} />
  }

  renderSuccessView = () => (
    <>
      <div>{this.renderVaccinationCoverage()}</div>
      <div>{this.renderVaccinationByGender()}</div>
      <div>{this.renderVaccinationByAge()}</div>
    </>
  )

  renderFailureView = () => (
    <div className="Failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="error">Something Went Wrong</h1>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="load-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderAllCharts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderSuccessView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    const {responseList} = this.state
    console.log(responseList)

    return (
      <div className="cowin-container">
        <div className="logo-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="logo-heading">Co-WIN</p>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <div>{this.renderAllCharts()}</div>
      </div>
    )
  }
}

export default CowinDashboard
