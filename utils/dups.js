exports.removeDups =  function (records) {
    let pix = {}
    records.forEach ( (record, idx) => {
      const thisPix = record['cover_url'] 
      if (thisPix in pix)
        record['cover_url'] = ''
      pix[thisPix] = 1
    })
    return records
}
