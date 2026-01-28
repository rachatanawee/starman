'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'
import { useParams, useRouter } from 'next/navigation'

interface Project {
  id: string
  name: string
  description: string
}

export function ProjectSwitcher() {
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string
  const currentProjectId = params.id as string
  const [open, setOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)

  useEffect(() => {
    // Load mock projects
    const mockProjects: Project[] = [
      { id: '1', name: 'E-Commerce Platform', description: 'Modern e-commerce platform with AI recommendations' },
      { id: '2', name: 'Warehouse Management System', description: 'Comprehensive WMS with inventory tracking' },
      { id: '3', name: 'API Gateway', description: 'Microservices API gateway implementation' }
    ]
    setProjects(mockProjects)

    if (currentProjectId) {
      const project = mockProjects.find(p => p.id === currentProjectId)
      setCurrentProject(project || null)
    }
  }, [currentProjectId])

  const handleSelectProject = (projectId: string) => {
    router.push(`/${locale}/projects/${projectId}/dashboard`)
    setOpen(false)
  }

  const handleNewProject = () => {
    router.push(`/${locale}/projects/new`)
    setOpen(false)
  }

  if (!currentProject) {
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <div className="bg-purple-500 p-1 rounded">
              <div className="h-4 w-4 text-white" />
            </div>
            <span className="truncate">{currentProject.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={() => handleSelectProject(project.id)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      currentProject.id === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-xs text-gray-500">{project.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem onSelect={handleNewProject}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
