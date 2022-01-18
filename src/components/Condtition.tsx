import { Children, ReactElement } from 'react'
import { ReactNode } from 'react'

export const When = (props: { condition: boolean; children: ReactNode }) => {
  return <>{props.condition && props.children}</>
}

export const WhenNot = (props: { condition: boolean; children: ReactNode }) => {
  return <>{props.condition || props.children}</>
}

export const True = (props: { children?: ReactNode }) => {
  return <>{props.children}</>
}

export const False = (props: { children?: ReactNode }) => {
  return <>{props.children}</>
}

export const Case = (props: { value: any; children?: ReactNode }) => {
  return <>{props.children}</>
}

export const Default = (props: { children?: ReactNode }) => {
  return <>{props.children}</>
}

export const If = (props: {
  condition: boolean
  children: ReactElement | ReactElement[]
}) => {
  const result = Children.map(props.children, x => x)
  return (
    <>
      {props.condition
        ? result.filter(x => x.type === True)
        : result.filter(x => x.type === False)}
    </>
  )
}

export const IfNot = (props: {
  condition: boolean
  children: ReactElement | ReactElement[]
}) => {
  const children = Children.map(props.children, x => x)
  return (
    <>
      {props.condition
        ? children.filter(x => x.type === False)
        : children.filter(x => x.type === True)}
    </>
  )
}

export const Match = (props: {
  condition: any
  children: ReactElement | ReactElement[]
}) => {
  const children = Children.map(props.children, x => x)
  const _case: any[] = []
  const _default: any[] = []
  children
    .filter(x => x.type === Case || x.type === Default)
    .forEach(x => {
      if (x.type === Case) {
        _case.push({
          case: x.props.value,
          element: x,
        })
      } else {
        _default.push(x)
      }
    })

  const result = _case
    .filter(x => x.case === props.condition)
    .map(x => x.element)
  return <>{result.length > 0 ? result : _default}</>
}
