const awsCli = require('aws-cli-js')
const Aws = awsCli.Aws

const aws = new Aws()

const create = async ({ bucketName, region, acl }) => {
  try {
    let params = `s3api create-bucket --bucket ${bucketName} --region ${region} --create-bucket-configuration LocationConstraint=${region} --acl ${acl}`
    const result = await aws.command(params)
    if (!result.raw) throw Error('no raw results')
    console.log('PASS', result.object)
  } catch (error) {
    return process.exit()
  }
}

const destroy = async ({ bucketName, region }) => {
  try {
    let params = `s3api delete-bucket --bucket ${bucketName} --region ${region}`
    const result = await aws.command(params)
    console.log('PASS', result.raw)
  } catch (error) {
    return process.exit()
  }
}

const sync = async ({
  srcPath,
  s3Path,
  dryrun = false,
  recursive = false,
  includes = [],
  excludes = []
}) => {
  try {
    let params = `s3 sync ${srcPath} s3://${s3Path}`

    if (excludes.length > 0) {
      excludes.forEach(pattern => (params += ` --exclude "${pattern}"`))
    }

    if (includes.length > 0) {
      includes.forEach(pattern => (params += ` --include "${pattern}"`))
    }

    if (dryrun) {
      params += ' --dryrun'
    }

    if (recursive) {
      params += ' --recursive'
    }

    const result = await aws.command(params)

    if (!result.raw) throw Error('no raw results')

    console.log('PASS', result.raw)
  } catch (error) {
    return process.exit()
  }
}

module.exports = {
  create,
  destroy,
  sync
}
