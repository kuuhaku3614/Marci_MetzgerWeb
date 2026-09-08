function Container({ as: Tag = 'div', className = '', children }) {
  return <Tag className={`mx-auto w-full max-w-[1200px] px-[22px] md:px-12 ${className}`}>{children}</Tag>
}

export default Container
