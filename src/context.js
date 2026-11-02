import { createContext, useContext } from 'react'

export const InvitationContext = createContext(null)

/** Lấy { content, images, audio, openLightbox, ... } ở bất kỳ component nào */
export function useInvitation() {
  const ctx = useContext(InvitationContext)
  if (!ctx) throw new Error('useInvitation phải dùng bên trong <WeddingInvitation>')
  return ctx
}
