import React from 'react'
import PropTypes from 'prop-types'
import HeaderBar from './HeaderBar.js'

import { DataRequest } from '@dhis2/app-service-data'

class HeaderBarContainer extends React.Component {
    render() {
        return (
            <DataRequest resourcePath="system/info">
                {({ loading, error, data }) => {
                    console.log(loading, error, data)
                    if (loading) return <span>...</span>
                    if (error) return <span>{`ERROR: ${error.message}`}</span>
                    return (
                        <HeaderBar
                            instanceName={data.systemName}
                            appName={this.props.appName}
                        />
                    )
                }}
            </DataRequest>
        )
    }
}

HeaderBarContainer.propTypes = {
    appName: PropTypes.string.isRequired,
}

export { HeaderBarContainer }
export default HeaderBarContainer
