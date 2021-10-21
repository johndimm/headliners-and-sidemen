exports.removeDups =  function (records) {
    let pix = {}
    if (records && Array.isArray(records))
      records.forEach ( (record, idx) => {
        const thisPix = record['cover_url'] 
        if (thisPix && thisPix != '') {
          if (thisPix in pix)
            record['cover_url'] = 'N/A'
          pix[thisPix] = 1
        }
      })

    // console.log(records)
    return records
}
