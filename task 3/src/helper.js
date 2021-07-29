function checkOnCorrectPath(folder, path) {
  const folderNames = path.split('/').filter(el => Boolean(el) === true)
  const matchedFoldersNames = []

  function recursiveCheck(folder, path, deepLength) {
    if(folder.name === folderNames[deepLength] && folderNames.length >= deepLength + 1) {
      matchedFoldersNames.push(folder.name)

      for (const children of folder.children) {
        recursiveCheck(children, path, deepLength + 1)
      }
    }
  }
  recursiveCheck(folder, path, 0)

  return folderNames.join('/') === matchedFoldersNames.join('/')
}

/* return only available expanded folders */
export function filterExpandedFolders(expandedFolders, data) {
  const result = []

  for(const path of expandedFolders) {
    for(const folder of data) {
      if(checkOnCorrectPath(folder, path)) {
        result.push(path)
      }
    }
  }

  return result
}

export function checkOnCollapseByDefault(expandedFolders, name) {
  if(expandedFolders && Array.isArray(expandedFolders) && expandedFolders.length !== 0) {
    for (const path of expandedFolders) {
      const foldersNames = path.split('/')

      if(foldersNames.includes(name)) {
        return false
      }
    }
  }

  return true
}

export function findFile(data, filename) {
  let potentialPath = ''
  let result = []

  function recursiveFind(children, filename) {
    for (const item of children) {
      if(item.type === 'FOLDER') {
        potentialPath += `/${item.name}`
        recursiveFind(item.children, filename)
      }

      if(item.type === 'FILE') {
        const isMatch = item.name.toLowerCase().includes(filename.toLowerCase())
        if(isMatch) {
          result.push(potentialPath)
        }
      }
    }
  }

  for(const folder of data) {
    potentialPath = `/${folder.name}`
    recursiveFind(folder.children, filename)
  }

  return result
}
