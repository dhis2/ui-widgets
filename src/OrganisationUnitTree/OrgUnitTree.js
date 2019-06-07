import { useDataQuery } from '@dhis2/app-runtime'
import React, {
    Component,
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import propTypes from 'prop-types'

import { Checkbox, Node } from '@dhis2/ui-core'
import {
    findDescendantSelectedPaths,
    getIdFromPath,
    isUnitSelected,
    orgUnitPathPropValidator,
    useOrgData,
    useSelectedDescendants,
    toggleOpen,
} from './helper'
import { Label } from './Label'

class _OrgUnitTree extends Component {
    constructor(props) {
        super(props)

        const { expanded, path, selected, singleSelectionOnly } = props

        this.state = {
            id: getIdFromPath(path),
            open: expanded.indexOf(path) !== -1,
            checked: isUnitSelected(path, selected, singleSelectionOnly),
            loading: true,
            error: null,
            data: { id: '', displayName: 'N/A', children: [] },
            hasSelectedDescendants: false,
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps) {
        const {
            path,
            selected,
            forceReload,
            onForceReloadDone,
            onForceReloadError,
            singleSelectionOnly,
        } = this.props

        if (prevProps.forceReload !== forceReload) {
            const pathInForceReload = props.forceReload.indexOf(path) !== -1

            if (pathInForceReload) {
                this.loadData()
                    .then(() => onForceReloadDone({ path }))
                    .catch(error => onForceReloadError({ path, error }))
            }
        }

        if (prevProps.selected !== this.props.selected) {
            this.setState({
                checked: isUnitSelected(path, selected, singleSelectionOnly),
                hasSelectedDescendants: !!findDescendantSelectedPaths(
                    path,
                    selected
                ).length,
            })
        }
    }

    componentWillUnmount() {
        const { onUnitUnloaded, path } = this.props
        const { loading } = this.state

        if (!loading && onUnitUnloaded) onUnitUnloaded({ path })
    }

    loadData = () => {
        this.loadingDataStart()

        // @TODO: Replace promise resolve with actual request
        return Promise.resolve({
            data: {
                id: this.state.id,
                displayName: 'Org Unit',
                children: [{ id: 'A0000000001' }, { id: 'A0000000002' }],
            },
        })
            .then(({ data }) => this.loadingDataDone(data))
            .catch(this.loadingDataError)
    }

    loadingDataStart = () => this.setState({ loading: true, error: null })
    loadingDataError = error => this.setState({ loading: false, error })
    loadingDataDone = data =>
        this.setState({
            data,
            loading: false,
            hasSelectedDescendants: !!findDescendantSelectedPaths(
                this.props.path,
                this.props.selected
            ).length,
        })

    onToggleOpen = () => {
        const { path, onExpand, onCollapse } = this.props
        const {
            data: { children },
        } = this.state
        const childIds = children.map(({ id }) => `${path}/${id}`)
        const payload = { path, children: childIds }

        const open = !this.state.open
        this.setState({ open })

        if (onExpand && newOpen) {
            onExpand(payload)
        } else if (onCollapse && !newOpen) {
            onCollapse(payload)
        }
    }

    render() {
        const {
            path,
            expanded,
            selected,
            onChange,
            singleSelectionOnly,
            onExpand,
            onCollapse,
            onUnitLoaded,
            onUnitUnloaded,
        } = this.props
        const {
            data: { children, displayName },
            hasSelectedDescendants,
            checked,
            loading,
            error,
            open,
            id,
        } = this.state

        const content = children.length
            ? !loading &&
              !error &&
              open &&
              children.map(child => (
                  <OrgUnitTree
                      key={child.id}
                      path={`${path}/${child.id}`}
                      selected={selected}
                      expanded={expanded}
                      onChange={onChange}
                      singleSelectionOnly={singleSelectionOnly}
                      onExpand={onExpand}
                      onCollapse={onCollapse}
                      onUnitLoaded={onUnitLoaded}
                      onUnitUnloaded={onUnitUnloaded}
                  />
              ))
            : undefined

        const label = (
            <Label
                id={id}
                path={path}
                error={error}
                loading={loading}
                checked={checked}
                onChange={onChange}
                displayName={displayName}
                singleSelectionOnly={singleSelectionOnly}
                hasSelectedDescendants={hasSelectedDescendants}
            />
        )

        return (
            <Node
                open={open}
                onOpen={this.onToggleOpen}
                onClose={this.onToggleOpen}
                component={label}
            >
                {content}
            </Node>
        )
    }
}

const OrgUnitTree = ({
    path,
    selected,
    expanded,
    onChange,
    singleSelectionOnly,
    onExpand,
    onCollapse,
    onUnitLoaded,
    onUnitUnloaded,
}) => {
    const id = useMemo(() => getIdFromPath(path), path)
    const [open, setOpen] = useState(expanded.indexOf(path) !== -1)
    const { loading, error, data = { node: {} } } = useOrgData(id)
    const checked = isUnitSelected(path, selected, singleSelectionOnly)
    const { children = [], displayName = '' } = data.node
    const hasSelectedDescendants = !!useSelectedDescendants(path, selected)
        .length

    const onToggleOpen = useCallback(
        toggleOpen(open, path, children, onExpand, onCollapse, setOpen),
        [open, path, children, onExpand, onCollapse, setOpen]
    )

    useEffect(() => {
        !loading && onUnitUnloaded && onUnitLoaded({ path })
        return () => !loading && onUnitUnloaded && onUnitUnloaded({ path })
    }, [loading, id, path])

    const content = children.length
        ? !loading &&
          !error &&
          open &&
          children.map(child => (
              <OrgUnitTree
                  key={child.id}
                  path={`${path}/${child.id}`}
                  selected={selected}
                  expanded={expanded}
                  onChange={onChange}
                  singleSelectionOnly={singleSelectionOnly}
                  onExpand={onExpand}
                  onCollapse={onCollapse}
                  onUnitLoaded={onUnitLoaded}
                  onUnitUnloaded={onUnitUnloaded}
              />
          ))
        : undefined

    const label = (
        <Label
            id={id}
            path={path}
            error={error}
            loading={loading}
            checked={checked}
            onChange={onChange}
            displayName={displayName}
            singleSelectionOnly={singleSelectionOnly}
            hasSelectedDescendants={hasSelectedDescendants}
        />
    )

    return (
        <Node
            open={open}
            onOpen={onToggleOpen}
            onClose={onToggleOpen}
            component={label}
        >
            {content}
        </Node>
    )
}

OrgUnitTree.propTypes = {
    path: orgUnitPathPropValidator,
    onChange: propTypes.func.isRequired,

    selected: propTypes.arrayOf(orgUnitPathPropValidator),
    expanded: propTypes.arrayOf(orgUnitPathPropValidator),
    forceReloaded: propTypes.arrayOf(orgUnitPathPropValidator),

    singleSelectionOnly: propTypes.bool,

    onExpand: propTypes.func,
    onCollapse: propTypes.func,
    onUnitLoaded: propTypes.func,
    onUnitUnloaded: propTypes.func,
    onForceReloadDone: propTypes.func,
    onForceReloadError: propTypes.func,
}

export { OrgUnitTree }
