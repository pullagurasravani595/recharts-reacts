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
    responseList: [],
  }

  componentDidMount() {
    this.getResponseDetails()
  }

  getResponseDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstraints.inProgress,
    })

    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const newData = await response.json()
      const updateData = await newData.map(eachVaccination => ({
        last7DaysVaccination: eachVaccination.last_7_days_vaccination.map(
          eachItem => ({
            vaccineDate: eachItem.vaccine_date,
            dose1: eachItem.dose_1,
            dose2: eachItem.dose_2,
          }),
        ),
        vaccinationByAge: eachVaccination.vaccination_by_age,
        vaccinationByGender: eachVaccination.vaccination_by_gender,
      }))
      this.setState({
        apiStatus: apiStatusConstraints.success,
        responseList: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderVaccinationCoverage = () => {
    const {responseList} = this.state
    const {last7DaysVaccination} = responseList

    return <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
  }

  renderVaccinationByGender = () => {
    const {responseList} = this.state
    const {vaccinationByGender} = responseList

    return <VaccinationByGender vaccinationByGender={vaccinationByGender} />
  }

  renderVaccinationByAge = () => {
    const {responseList} = this.state
    const {vaccinationByAge} = responseList

    return <VaccinationByAge vaccinationByAge={vaccinationByAge} />
  }

  renderSuccessView = () => (
    <div>
      <div>{this.renderVaccinationCoverage()}</div>
      <div>{this.renderVaccinationByGender()}</div>
      <div>{this.renderVaccinationByAge()}</div>
    </div>
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
    <div data-testid="loader" className="Failure-container">
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
        {this.renderAllCharts()}
      </div>
    )
  }
}

export default CowinDashboard
