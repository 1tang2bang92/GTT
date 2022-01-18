export function openFileBrowser() {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.setAttribute('webkitdirectory', '')
  fileInput.setAttribute('directory', '')
  fileInput.click()

  fileInput.onchange = () => {
    const files = fileInput.files!!
    const fileReads: any[] = []
    console.log(files)
    for (let i = 0; i < files.length; ++i) {
      const fr = new FileReader()
      const file = files[i]!!
      const workspace = file.webkitRelativePath.split('/')[0]

      fr.onload = event => {
        fileReads.push({
          name: file.name,
          content: fr.result as string,
        })
        if (fileReads.length !== files.length) return

        window.postMessage({
          direction: 'to',
          command: 'upload-workspace',
          data: {
            workspace: workspace,
            files: fileReads
          },
        })
      }

      fr.readAsText(file)
    }
  }
}
