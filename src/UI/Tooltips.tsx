import {styled, Tooltip} from '@mui/material'
import {TooltipProps} from '@mui/material/Tooltip/Tooltip'

export const SuccessTooltip = styled(({className, ...props}: TooltipProps) => (
	<Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
    color: white;
    background-color: green;
    font-size: 12px;
`)

export const ErrorTooltip = styled(({className, ...props}: TooltipProps) => (
	<Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
    color: white;
    background-color: #d32f2f;
    font-size: 12px;
`)