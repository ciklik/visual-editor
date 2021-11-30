import { useData } from 'src/store'
import { CopyAction } from './CopyAction'
import React from 'react'

export function CopyPage(props: Record<string, any> = {}) {
  const data = useData()
  return <CopyAction data={data} {...props} />
}
